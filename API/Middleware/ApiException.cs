namespace API.Middleware
{
    internal class ApiException
    {
        private int _statusCode;
        private string _message;
        private string _v;

        public ApiException(int statusCode, string message, string v)
        {
            _statusCode = statusCode;
            _message = message;
            _v = v;
        }
    }
}