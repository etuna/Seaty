
using SeatyDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Seaty.Controllers
{
[EnableCorsAttribute("http://localhost:55621", "*","*")]
    public class SeatingController : ApiController
    {

         [BasicAuthentication]
        public IEnumerable<CinemaHall> GetAll()
        {
            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {
                return entities.CinemaHalls.ToList();

            }
        }
        public IEnumerable<CinemaHall> GetAll(int x)
        {
            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {
                    return entities.CinemaHalls;
            }
        }
        public Visitor Get(string ID)
        {
            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {
                return entities.Visitors.FirstOrDefault(e => e.VisitorID == ID);
            }
        }



        public HttpResponseMessage Post([FromBody]User user)
        {
            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {



                entities.Users.Add(user);

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

                var messages = Request.CreateResponse(HttpStatusCode.Created, user);

                return messages;
            }

        }



    }
}
