﻿using API.Data;
using API.Entities;
using API.Extensions;
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
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy,string searchValue)
        {
            var query = _storeContext.Products
                .Sort(orderBy)
                .Search(searchValue)
                .AsQueryable();
            return await query.ToListAsync();
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
