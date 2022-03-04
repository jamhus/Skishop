using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace API.Services
{
    public class ImageService
    {
        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _config;

        public ImageService(IConfiguration config)
        {
            var acc = new Account(
                 _config["CloudinarySettings:CloudName"],
                 _config["CloudinarySettings:ApiKey"],
                 _config["CloudinarySettings:ApiSecret"]
            );

            _cloudinary = new Cloudinary(acc);
            _config = config;
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream)                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);

            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result;
        }
    }
}
