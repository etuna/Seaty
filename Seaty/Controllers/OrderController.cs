using SeatyDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Seaty.Controllers
{
    public class OrderController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Order order)
        {
            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {

                entities.Orders.Add(order);
                int numof = entities.Database.ExecuteSqlCommand(@"UPDATE Seats SET Status = 1 WHERE SeatID ='"+order.SeatID+"' and SectionID = '"+ order.SectionID+"';");
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

                var messages = Request.CreateResponse(HttpStatusCode.Created, order);

                return messages;
            }

        }




    }
}
