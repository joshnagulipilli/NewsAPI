import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// import Spinner from "./Spinner";

export class News extends Component {
  articles = []
  constructor(props) {
    super(props);
    console.log("this is news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults:0
      
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey` 
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  async UpdateNews()
  {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&&pageSize=${this.props.pagesize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  } 



  async componentDidMount() {
   this.UpdateNews();
  }

  handlePrevClick = async () => {
    // console.log("previous");
    // console.log(this.state.page);
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d9d333b53b14a2297a536364b11844b&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pagesize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      // articles: parsedData.articles,
      // loading: false,
    });
    this.UpdateNews();
  };

  handleNextClick = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pagesize)
    //   )
    // ) {
    //   console.log("Next");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d9d333b53b14a2297a536364b11844b&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pagesize}`;
    //   this.setState({ loading: true });
    //   console.log(this.state.page);
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        // articles: parsedData.articles,
        // loading: false,
      });
      this.UpdateNews();
    // }
  };


  fetchMoreData = async() => {
  
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&&pageSize=${this.props.pagesize}`
   this.setState({page :this.state.page +1})
   let data = await fetch(url);
   let parsedData = await data.json();
   console.log(parsedData);
   this.setState({
     articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
     loading:false
   });
  };

  render() {
    return (
    <> 
    <div className="container my-5">
        <h2 className="text-center">NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        { this.state.loading && <Spinner /> } 
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader=<Spinner/>
      >

      <div className="container">
        <div className="row">
          {   /*!this.state.loading && */
            this.state.articles.map((element) => {
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
}

export default News;
