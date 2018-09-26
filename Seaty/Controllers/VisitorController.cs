using SeatyDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Seaty.Controllers
{
    public class VisitorController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Visitor visitor)
        {
            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {

                entities.Visitors.Add(visitor);

                try
                {
                    entities.SaveChanges();
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("{0}:{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            // raise a new exception nesting
                            // the current instance as InnerException
                            raise = new InvalidOperationException(message, raise);
                        }
                    }
                    throw raise;
                }

                var messages = Request.CreateResponse(HttpStatusCode.Created, visitor);

                return messages;
            }

        }

    }
}
