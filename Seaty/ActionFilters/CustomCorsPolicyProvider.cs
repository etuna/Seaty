using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace WebApi3.ActionFilters.Cors
{
    public class CustomCorsPolicyProvider : ICorsPolicyProvider
    {
        /// <summary>
        /// Returns custom CorsPolicy with AllowAnyHeader and AllowAnyMethod set to true by default.
        /// Allowed origins are imported from config via helper then split into an array and added to
        /// the CorsPolicy.Origins variable of type "IList string".
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            CorsPolicy corsPolicy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                SupportsCredentials = true
                // Optionally ::
                //,AllowAnyOrigin = true
            };

            // Get Allowed Origins from Config and split by comma. Can be changed to any character that you chose.
            // string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',');
            string[] origins = {"http://localhost:55621",
                "http://localhost/BossApi",
                "http://localhost/BossWeb",
                "http://192.168.0.109/BossApi",
                "http://192.168.0.109/BossWeb",
                "http://localhost:45702",
                "http://localhost:65024",
                "http://rasyontakipweb.tr.issworld.com",
                "http://rasyontakipapi.tr.issworld.com",
                "http://10.101.15.4:8090",
                "http://10.101.15.4:8091",
                "http://192.168.10.2:8090",
                "http://192.168.10.2:8091",
                "http://213.74.185.35:8090",
                "http://213.74.185.35:8091",
                "http://192.168.0.148:8090",
                "http://192.168.0.148:8091",
                "http://192.168.0.111:65024",
                "http://192.168.0.111:27509",
                "http://10.34.32.22:8090",
                "http://10.34.32.22:8091",
                "http://10.138.1.82:8090",
                "http://10.138.1.82:8091",
                "http://demo.senkron.net:8090",
                "http://demo.senkron.net:8091",
                "http://10.100.179.22:8090",
                "http://10.100.179.22:8091"
            };
            // To split by multiple types use the following example as a template:
            // string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',','+');

            foreach (string origin in origins)
            {
                corsPolicy.Origins.Add(origin);
            }

            return Task.FromResult(corsPolicy);
        }
    }
}