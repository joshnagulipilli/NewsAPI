import React, { Component } from 'react'

export class NewsItem extends Component {
  
 
  render() {

    let {title , description ,imageUrl , newsUrl , author , date ,source } = this.props
    return (
      <div className="my-3">
      <div className="card" style={{width: "18rem"}}>
    <div>
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{display:'flex' , justifyContent:'flex-end' , position:'absolute' , right:'0'}}>
    {source}
  </span>
  </div>
     
  <img className="card-img-top" src={(!imageUrl)?"https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/mobileye-porsche-announcement.jpg":(imageUrl)} alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} rel="noreferrer "  target='_blank'  className="btn btn-sm btn-dark">Read More</a>
      </div>
      </div>
      </div>
    )
  }
}

export default NewsItem