using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        private readonly IMapper _mapper;
        private readonly ImageService _image;

        public ProductsController(StoreContext storeContext, IMapper mapper,ImageService image)
        {
            _storeContext = storeContext;
            _mapper = mapper;
            _image = image;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _storeContext.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var porducts = await PagedList<Product>.ToBagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(porducts.MetaData);
            return porducts;
        }

        [HttpGet("{id}", Name = "GetProduct")] //api/products/3

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpGet("filters")]

        public async Task<IActionResult> GetFilters()
        {
            var brands = await _storeContext.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _storeContext.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if(productDto.File != null)
            {
                var imageResult = await _image.AddImageAsync(productDto.File);
                if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message});

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _storeContext.Products.Add(product);

            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }  
        
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct( [FromForm] UpdateProductDto productDto)
        {
            var product = await _storeContext.Products.FindAsync(productDto.Id);

            if (product == null) return NotFound();

            // EF is tracking the product and is aware about the changes 
            _mapper.Map(productDto, product);

            if(productDto.File!= null)
            {
                var imageResult = await _image.AddImageAsync(productDto.File);
                if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if(!string.IsNullOrEmpty(product.PublicId))
                {
                    await _image.DeleteImageAsync(product.PublicId);
                }

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result) return NoContent();

            return BadRequest(new ProblemDetails { Title = "Problems updating product"});
    
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await _image.DeleteImageAsync(product.PublicId);
            }

            _storeContext.Remove(product);

            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result) return NoContent();

            return BadRequest(new ProblemDetails { Title = "Problems deleting product" });

        }
    }
}
