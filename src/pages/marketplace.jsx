import * as React from "react";
import { Fragment } from "react";
import { ListingItem } from "../components/listing-item";

const getListings = () =>
  fetch("https://ecomm-service.herokuapp.com/marketplace").then((res) =>
    res.json()
  );

const postListings = (data) => 
  fetch("https://ecomm-service.herokuapp.com/marketplace",{
    method: "POST",
    header: { 'Content-Type':'application/json',},
    body: JSON.stringify(data)
  });

export const Marketplace = () => {
  const [listings, setListings] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  const [ title, setTitle ] = React.useState()
  const [ price, setPrice ] = React.useState()
  const [ description, setDescription ] = React.useState()
  const [ condition, setCondition ] = React.useState('new')
  const [ availability, setAvailability ] = React.useState('in-stock')
  const [ numOfStock, setNumOfStock ] = React.useState()



  return (
    <>
      <form
        onSubmit = {(e) => {
          e.preventDefault();
          postListings({
            title,
            description,
            price: Number(price),
            condition,
            availability: availability,
            numOfStock: Number(numOfStock)
          })
        }}>
        <div className="p-3">New Listing</div>
        <div className="space-y-5 p-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input type="text" id="title" value = {title} onChange = {(e) => {setTitle(e.target.value)}} />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input type="number" id="price" value = {price} onChange = {(e) => {setPrice(e.target.value)}}/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea id="description" value = {description} onChange = {(e) => {setDescription(e.target.value)}}/>
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium">
              Condition
            </label>
            <select id="condition" value = {condition} onChange = {(e) => {setCondition(e.target.value)}}>
              <option value="new">New</option>
              <option value="used_like-new">Used (like new)</option>
              <option value="used_good">Used (good)</option>
              <option value="used_fair">Used (fair)</option>
            </select>
          </div>
          <div>
            <label htmlFor="availability" className="block text-sm font-medium">
              Availability
            </label>
            <select id="availability" value = {availability} onChange = {(e) => {setAvailability(e.target.value)}}>
              <option value="in-stock">In Stock</option>
              <option value="single-item">Single Item</option>
            </select>
          </div>
          <div>
            <label htmlFor="numOfStock" className="block text-sm font-medium">
              Number of Available Stock
            </label>
            <input type="number" id="numOfStock" value = {numOfStock} onChange = {(e) => {setNumOfStock(e.target.value)}}/>
          </div>
          <div>
            <button>ADD</button>
          </div>
        </div>
      </form>

    <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
        {listings &&
          listings.map((item) => (
            <ListingItem
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              price={item.price}
              availableStock={item.numOfStock}
              onlyOne={item.availability === "single-item"}
              key={item._id}
            />
          ))}
      </div>
      {!listings && (
        <div>
          <button
            onClick={() => {
              setIsLoading(true);
              getListings().then((data) => setListings(data));
            }}
            type="button"
          >
            {isLoading ? "Loading..." : "Load Listing"}
          </button>
        </div>
      )}
    </div>
    </>
  );
};
