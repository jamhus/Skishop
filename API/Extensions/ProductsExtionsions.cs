using API.Entities;
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
    }
}
