import React, { useEffect,useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props)=> {
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setpage] = useState(1);
    const [totalResults,settotalResults] = useState(0);

 
  const updt = async()=>{
    // document.title = `${props.category}`;
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe540b5eff0b4ca3a2831866d8c81188&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedata = await data.json();
    props.setProgress(70);
    setArticles(parsedata.articles);
    settotalResults(parsedata.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    updt()
  },[])
  
  // const nxt = async () => {
  //   setpage(page+1);
  //   updt();
  // };

  // const prv = async () => {
  //   setpage(page-1);
  //   updt();
  // };
  const fetchData = async () => {
    setpage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe540b5eff0b4ca3a2831866d8c81188&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedata = await data.json();
    setArticles(articles.concat(parsedata.articles));
    settotalResults(parsedata.totalResults);
    setLoading(false)
  };

    return (
      // <div style={{backgroundColor:"black"}}>
      <div className="" style={{ backgroundColor: "black", color: "white" }}>
        <center><br/><br /><br /><br />
          <h2>This is News on {props.category}</h2>
        </center>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length} // This is important to track the length of data
          next={fetchData} // Fetch next page of data
          hasMore={articles.length !== totalResults} // Whether there are more items to load
          loader={<Spinner />} // Loader component shown while loading more items
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className='container d-flex justify-content-between'>
      <button disabled={page<=1} type="button" onClick={prv} className="btn btn-sm btn-primary">&lt;--Previous</button>
      
      <button disabled={page + 1 > Math.ceil(totalArticles/props.pageSize)} type="button" onClick={nxt} className="btn btn-sm btn-primary">Next--&gt;</button>
      </div> */}
      </div>
      // </div>

    );
  
}


News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

export default News;
