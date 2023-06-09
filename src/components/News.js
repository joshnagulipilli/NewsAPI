import React, { useEffect , useState } from "react";
import PropTypes from 'prop-types'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// import Spinner from "./Spinner";

export default function News (props) {
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey` 
  
  const capitalizeFirstLetter = (string)=>
   {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  const UpdateNews= async()=>
  {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&&pageSize=${props.pagesize}`
   
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults( parsedData.totalResults)
    props.setProgress(100)
  } 

  useEffect(()=>
  {
    UpdateNews();

  },[])


//   const handlePrevClick = async () => {
   
//  setPage(page-1)
//     UpdateNews();
//   };

//  const handleNextClick = async () => {
//     setPage(page+1)
//     UpdateNews();
//   };


  const fetchMoreData = async() => {
  
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&&pageSize=${props.pagesize}`
  
   setPage(page+1)
   let data = await fetch(url);
   let parsedData = await data.json();
  //  console.log(parsedData);
   setArticles(articles.concat(parsedData.articles))
   setLoading(false)
   setTotalResults( parsedData.totalResults)
    
  };

    return (
    <> 
    <div className="container my-5">
        <h2 className="text-center " style={{marginTop:'90px'}} >NewsMonkey -Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        { loading && <Spinner /> } 
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader=<Spinner/>
      >

      <div className="container">
        <div className="row">
          {   /*!loading && */
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem  title={element.title ? element.title.slice(0, 45) : ""}  description={  element.description? element.description.slice(0, 88) : "" }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author} 
                    date={element.publishedAt}
                    source={element.source.name} />
                </div>
              );
            })}
            </div>
            </div>
           </InfiniteScroll>
           </div>
           </>
    );
  }




News.defaultProps ={
  country : 'in',
  pagesize : 5,
  category :'general'
}
News.propsType ={
 country : PropTypes.string ,
 pagesize :PropTypes.number,
 category :PropTypes.string
}
