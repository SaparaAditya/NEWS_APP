import React from "react";
const Newsitem =(props)=> {
    let { title, description, imageurl, newsurl, author, date, source } =
      props;
    return (

      <div className="my-5" >
        <div
          className="card"
          style={{ backgroundColor: "black", color: "white"}}
        >
          <div className="">
              <span 
                className="badge bg-danger"
                style={{position:'absolute'}}
              >
                {source}
              </span>
            </div>
          <img
            src={
              !imageurl
                ? "https:images.moneycontrol.com/static-mcnews/2023/06/Symptoms-of-enlarged-adenoids-in-children-770x433.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text">{description}</p>
            

            <p className="card-text">
              <small className="">
                by {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
}

export default Newsitem;
