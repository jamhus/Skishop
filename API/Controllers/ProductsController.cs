using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _storeContext;

        public ProductsController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products =  await _storeContext.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")] //api/products/3

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null)   return NotFound();   
            return Ok(product); 
        }
    }
}
