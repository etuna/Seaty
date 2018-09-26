using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Cors;

namespace WebApi3.ActionFilters.Cors
{
    public class CorsPolicyFactory : ICorsPolicyProviderFactory
    {
        ICorsPolicyProvider _provider = new CustomCorsPolicyProvider();

        public ICorsPolicyProvider GetCorsPolicyProvider(HttpRequestMessage request)
        {
            return _provider;
        }
    }
}