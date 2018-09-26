using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SeatyDataAccess;
namespace Seaty.Controllers
{
    public class SectionController : ApiController
    {

        //public IEnumerable<Section> GetAll()
        //{
        //    using(CinemaSeatingEntities entities = new CinemaSeatingEntities())
        //    {
        //        return entities.Sections.ToList();
        //    }
        //}

            [HttpGet]
        public List<pGetFilms_Result> GetAll(string id)
        {
            //List<string> sectionstrs =new List<string>();
            //List<Section> secs = new List<Section>();

            //using(CinemaSeatingEntities entities = new CinemaSeatingEntities())
            //{
            //    foreach(Film flm in entities.Films)
            //    {
            //        if(flm.FilmName == filmName)
            //        {
            //            sectionstrs.Add(flm.SectionID);
            //        }
            //    }

            //    foreach(Section sec in entities.Sections)
            //    {
            //        if (sectionstrs.Contains(sec.SectionID.ToString()))
            //        {
            //            secs.Add(sec);
            //        }
            //    }

            //    return secs;
            //}

            using (mCinemaSeatingEntities entities = new mCinemaSeatingEntities())
            {
                List<pGetFilms_Result> list = entities.pGetFilms(id).ToList();
                return list;
            }
        }




    }
}
