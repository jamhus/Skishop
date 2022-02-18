using API.Entities;
using System.Collections.Generic;
using System.Linq;

namespace API.Extensions
{
    public static class ProductsExtionsions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue)) return query;
            
            var searchValueLowerCase = searchValue.Trim().ToLower();
            return query.Where(p => p.Name.ToLower().Contains(searchValueLowerCase));
        }

        public static IQueryable<Product> Filter (this IQueryable<Product> query, string brands , string types)
        {
            var brandsList = new List<string>();
            var typesList = new List<string>();

            if(!string.IsNullOrEmpty(brands))
            {
                brandsList.AddRange(brands.ToLower().Split(",").ToList());
            }
            if (!string.IsNullOrEmpty(types))
            {
                typesList.AddRange(types.Split(",").ToList());
            }

            query = query.Where(p=> brandsList.Count == 0 || brands.Contains(p.Brand.ToLower()));
            query = query.Where(p=> typesList.Count == 0 || types.Contains(p.Type.ToLower()));

            return query;
        }
    }
}
