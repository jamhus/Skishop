using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
           return NotFound();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "this is a bad request" });
        }

        [HttpGet("unauthorize")]
        public ActionResult<string> GetUnauthorize()
        {
            return Unauthorized("Unauthorized");
        }

        [HttpGet("validation-error")]
        public ActionResult<string> GetValidationError()
        {
            ModelState.AddModelError("Problem1", "this is the first error");
            ModelState.AddModelError("Problem2", "this is the second error");

            return ValidationProblem();
        }
    }
}
