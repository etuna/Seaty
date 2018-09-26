using SeatyDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Seaty.Controllers
{
    public class SeatsController : ApiController
    {
        //id : sectionID
        public List<pGetSeats_Result> GetAll(string id)
        {
            using(mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {
                return entities.pGetSeats(id).ToList();
            }
        }





    }
}
