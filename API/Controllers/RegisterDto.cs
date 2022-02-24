using API.DTOs;

namespace API.Controllers
{
    public class RegisterDto : LoginDto
    {
        public string Email { get; set; }
    }
}
