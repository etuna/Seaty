using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;
using System.Web.Http.Filters;

namespace WebApi3.ActionFilters.Cors
{

    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class ConfiguredCORSPolicyProviderAttribute : ActionFilterAttribute, ICorsPolicyProvider
    {
        private CorsPolicy _policy;

        public ConfiguredCORSPolicyProviderAttribute()
        {
            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true
            };

            // If there are no domains in the 'CORSDomainSection' section in Web.config, all origins will be allowed by default.
            /* var domains = (CORSDomainSection)ConfigurationManager.GetSection("CORSDomainSection");

             if (domains != null)
             {
                 foreach (DomainConfigElement domain in domains.Domains)
                 {
                     _policy.Origins.Add(domain.Domain);
                 }
             }
             else
             {
                 _policy.AllowAnyOrigin = true;
             }*/
            _policy.AllowAnyOrigin = true;
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request)
        {
            return Task.FromResult(_policy);
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken token)
        {
            return GetCorsPolicyAsync(request);
        }
    }
}
