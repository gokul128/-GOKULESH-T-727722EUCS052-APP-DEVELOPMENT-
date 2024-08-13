import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Sample venues data with additional venues and price
const sampleVenues = [
  {
    id: 1,
    name: "Grand Ballroom",
    location: "Singanallur",
    capacity: 500,
    price: 2000,
    description: "A luxurious ballroom with elegant decor.",
    image:
      "https://images.pexels.com/photos/17931472/pexels-photo-17931472/free-photo-of-flower-arrangements-and-a-birthday-cake-in-a-reception-hall.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Garden Pavilion",
    location: "RS Puram",
    capacity: 300,
    price: 1500,
    description: "A beautiful outdoor venue surrounded by gardens.",
    image:
      "https://images.pexels.com/photos/24426488/pexels-photo-24426488/free-photo-of-hotel-with-garden-in-forest.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "City Conference Center",
    location: "Race Course",
    capacity: 1000,
    price: 5000,
    description: "A modern conference center in the heart of the city.",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.WT58buYHFJmPrbqZmAmLtQHaFj&pid=Api&P=0&h=220",
  },
  {
    id: 4,
    name: "Cozy Loft",
    location: "Palladam",
    capacity: 100,
    price: 1000,
    description: "A cozy loft perfect for intimate gatherings.",
    image: "https://tse3.mm.bing.net/th?id=OIP.pYtVHkGMD1tKJ4oEPErn2gHaE8&pid=Api&P=0&h=220",
  },
  {
    id: 5,
    name: "Ocean View Terrace",
    location: "Gandhipuram",
    capacity: 200,
    price: 2500,
    description: "A terrace with breathtaking ocean views.",
    image: "https://tse1.mm.bing.net/th?id=OIP.kk55FVNhM4JrnhPqqOCcnQHaEI&pid=Api&P=0&h=220",
  },
  {
    id: 6,
    name: "Rustic Barn",
    location: "SB Colony",
    capacity: 150,
    price: 1800,
    description: "A rustic barn offering a charming countryside experience.",
    image: "https://tse4.mm.bing.net/th?id=OIP.AMvyFx6gWb8fiPiIe_wpWwAAAA&pid=Api&P=0&h=220",
  },
  {
    id: 7,
    name: "Skyline Rooftop",
    location: "Ondipudhur",
    capacity: 250,
    price: 3000,
    description: "A rooftop venue with panoramic city views.",
    image: "https://tse2.mm.bing.net/th?id=OIP.-ivV_-rVAB__AyTb3kQi0wHaE7&pid=Api&P=0&h=220",
  },
  {
    id: 8,
    name: "Lakeside Lodge",
    location: "Kuniyamuthur",
    capacity: 350,
    price: 3500,
    description: "A lodge with a serene lakeside setting.",
    image: "https://tse1.mm.bing.net/th?id=OIP.M39mylFNzXW5f-KciMrMnwHaEl&pid=Api&P=0&h=220",
  },
];

const Venues = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [filteredVenues, setFilteredVenues] = useState(sampleVenues);

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to filter venues based on user input
  const filterVenues = () => {
    const results = sampleVenues.filter((venue) => {
      return (
        (location === "" ||
          venue.location.toLowerCase().includes(location.toLowerCase())) &&
        (price === "" || venue.price <= parseInt(price)) &&
        (capacity === "" || venue.capacity >= parseInt(capacity))
      );
    });
    setFilteredVenues(results);
  };

  // useEffect to trigger search when inputs change
  useEffect(() => {
    filterVenues();
  }, [location, price, capacity]); // Dependencies for the useEffect hook

  // Function to navigate to the booking page based on venue ID
  const handleBookNow = (venue) => {
    const routes = {
      1: "/book1",
      2: "/book2",
      3: "/book3",
      4: "/book4",
      5: "/book5",
      6: "/book6",
      7: "/book7", // Assuming you have a route for book7
      8: "/book8", // Assuming you have a route for book8
    };
    const route = routes[venue.id];
    if (route) {
      navigate(route, { state: { venue } });
    }
  };

  return (
    <div>
      <div class="relative bg-cover bg-center bg-no-repeat h-72 bg-black">
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 class="text-white text-6xl font-bold text-center px-4">
            Let’s get the party started
          </h1>
        </div>
      </div>

      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Find Your Perfect Venue
        </h1>
        <div className="max-w-8xl mx-auto bg-black shadow-lg rounded-lg p-8 mb-10">
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location"
              />
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter maximum price"
              />
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minimum capacity"
              />
            </div>
          </div>
          <button
            onClick={filterVenues}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search Venues
          </button>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{venue.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Location: {venue.location}
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    Price: ${venue.price}
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    Capacity: {venue.capacity}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {venue.description}
                  </p>
                  <button
                    onClick={() => handleBookNow(venue)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-6">No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default Venues;
