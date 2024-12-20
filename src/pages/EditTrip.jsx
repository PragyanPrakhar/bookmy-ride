// import { useState, useRef, useEffect } from "react";
// import { X, Upload } from "lucide-react";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// export default function EditTrip() {
//     const [data, setData] = useState("");
//     const { id } = useParams();
//     const fetchData = async () => {
//         try {
//             const res = await fetch(
//                 "http://localhost:3000/trip/viewTrip/" + id,
//                 {
//                     method: "GET",
//                     credentials: "include",
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`Error: ${res.statusText}`);
//             }
//             const result = await res.json();
//             console.log("Fetched Data from the ViewTrip:", result);
//             console.log("Title is ", data?.title);
//             setData(result.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     useEffect(() => {
//         fetchData();
//     }, []);
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         destinations: [],
//         newDestination: "",
//         price: "",
//         duration: "",
//         availableSeats: "",
//         startDate: "",
//         endDate: "",
//         photoUrl: null,
//         photoFile: null,
//         busType: "",
//     });

//     useEffect(() => {
//         if (data) {
//             setFormData({
//                 title: data.title || "",
//                 description: data.description || "",
//                 destinations: data.destination || [],
//                 newDestination: "",
//                 price: data.price || "",
//                 duration: data.duration || "",
//                 availableSeats: data.availableSeats || "",
//                 startDate: data.startDate || "",
//                 endDate: data.endDate || "",
//                 photoUrl: data.photo || null,
//                 photoFile: null,
//                 busType: data?.busType,
//             });
//         }
//     }, [data]);
//     const fileInputRef = useRef(null);

//     const handleAddDestination = () => {
//         if (formData.newDestination.trim()) {
//             setFormData((prev) => ({
//                 ...prev,
//                 destinations: [
//                     ...prev.destinations,
//                     prev.newDestination.trim(),
//                 ],
//                 newDestination: "",
//             }));
//         }
//     };

//     const handleRemoveDestination = (index) => {
//         setFormData((prev) => ({
//             ...prev,
//             destinations: prev.destinations.filter((_, i) => i !== index),
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setFormData((prev) => ({
//                     ...prev,
//                     photoUrl: reader.result,
//                     photoFile: file,
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [id]: value,
//         }));
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Before Adding all the data to the edited trip data");
//         const editedTripData = new FormData();
//         editedTripData.append("title", formData.title);
//         editedTripData.append("description", formData.description);
//         editedTripData.append(
//             "destination",
//             JSON.stringify(formData.destinations)
//         );
//         editedTripData.append("price", formData.price);
//         editedTripData.append("duration", formData.duration);
//         editedTripData.append("availableSeats", formData.availableSeats);
//         editedTripData.append("startDate", formData.startDate);
//         editedTripData.append("endDate", formData.endDate);
//         editedTripData.append("busType", formData.busType);
//         console.log("PhotoFile is :- ", formData.photoFile);
//         if (formData.photoFile) {
//             editedTripData.append("image", formData.photoFile);
//         }
//         console.log("All Data Added to the Edited Trip Data");
//         try {
//             const res = await fetch(
//                 "http://localhost:3000/trip/editTrip/" + id,
//                 {
//                     method: "PATCH",
//                     body: editedTripData,
//                     credentials: "include",
//                 }
//             );
//             if (res.status === 200) {
//                 const data = await res.json();
//                 console.log("Trip Updated Successfully :-", data.message);
//                 toast.success("Trip Updated Successfully :");
//                 setFormData({
//                     title: "",
//                     description: "",
//                     destinations: [],
//                     newDestination: "",
//                     price: "",
//                     duration: "",
//                     availableSeats: "",
//                     startDate: "",
//                     endDate: "",
//                     photoUrl: null,
//                 });
//             } else {
//                 console.log("Error in updating trip");
//             }
//         } catch (error) {
//             console.error("Error in Updating the trip :-", error);
//         }
//     };
//     return (
//         <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl"
//             >
//                 <h2 className="text-3xl font-bold mb-6 text-red-500">
//                     Edit Your Trip
//                 </h2>
//                 <div className="space-y-4">
//                     <div>
//                         <label
//                             htmlFor="title"
//                             className="block text-white mb-1"
//                         >
//                             Title
//                         </label>
//                         <input
//                             id="title"
//                             type="text"
//                             value={formData.title}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="description"
//                             className="block text-white mb-1"
//                         >
//                             Description
//                         </label>
//                         <textarea
//                             id="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
//                         ></textarea>
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="destination"
//                             className="block text-white mb-1"
//                         >
//                             Destinations
//                         </label>
//                         <div className="flex space-x-2">
//                             <input
//                                 id="newDestination"
//                                 type="text"
//                                 value={formData.newDestination}
//                                 onChange={handleChange}
//                                 className="flex-grow px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={handleAddDestination}
//                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {formData.destinations.map((dest, index) => (
//                                 <span
//                                     key={index}
//                                     className="bg-red-500 text-white px-2 py-1 rounded-full text-sm flex items-center"
//                                 >
//                                     {dest}
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             handleRemoveDestination(index)
//                                         }
//                                         className="ml-2 focus:outline-none"
//                                     >
//                                         <X size={14} />
//                                     </button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label
//                                 htmlFor="price"
//                                 className="block text-white mb-1"
//                             >
//                                 Price
//                             </label>
//                             <input
//                                 id="price"
//                                 type="number"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="duration"
//                                 className="block text-white mb-1"
//                             >
//                                 Duration (days)
//                             </label>
//                             <input
//                                 id="duration"
//                                 type="number"
//                                 value={formData.duration}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="availableSeats"
//                             className="block text-white mb-1"
//                         >
//                             Available Seats
//                         </label>
//                         <input
//                             id="availableSeats"
//                             type="number"
//                             value={formData.availableSeats}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label
//                                 htmlFor="startDate"
//                                 className="block text-white mb-1"
//                             >
//                                 Start Date
//                             </label>
//                             <input
//                                 id="startDate"
//                                 type="date"
//                                 value={formData.startDate}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="endDate"
//                                 className="block text-white mb-1"
//                             >
//                                 End Date
//                             </label>
//                             <input
//                                 id="endDate"
//                                 type="date"
//                                 value={formData.endDate}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="photo"
//                             className="block text-white mb-1"
//                         >
//                             Trip Photo
//                         </label>
//                         <div className="mt-1 flex items-center space-x-4">
//                             <button
//                                 type="button"
//                                 onClick={() => fileInputRef.current?.click()}
//                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
//                             >
//                                 <Upload className="mr-[0.25rem] h-[1rem] w-[1rem]" />{" "}
//                                 Upload Image
//                             </button>
//                             <input
//                                 id="photo"
//                                 type="file"
//                                 accept="image/*"
//                                 required
//                                 className="hidden"
//                                 ref={fileInputRef}
//                                 onChange={handleImageChange}
//                             />
//                             {formData.photoUrl && (
//                                 <div className="relative w-[6rem] h-[6rem]">
//                                     <img
//                                         src={formData.photoUrl}
//                                         alt="Preview"
//                                         className="w-full h-full object-cover rounded"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setFormData((prev) => ({
//                                                 ...prev,
//                                                 photoUrl: null,
//                                             }))
//                                         }
//                                         className="absolute top-[0] right-[0] bg-red-[rgb(239,68,68)] rounded-full p-[0.25rem]"
//                                     >
//                                         <X
//                                             size={14}
//                                             className="[color:white]"
//                                         />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     <div>
//                         <select
//                             id="busType"
//                             name="busType"
//                             value={formData.busType} // Bind to form data state
//                             onChange={handleChange} // Handle the change event
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         >
//                             <option value="" disabled>
//                                 Select Bus Type
//                             </option>
//                             <option value="2x1">2x1</option>
//                             <option value="3x1">3x1</option>
//                         </select>
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                     Edit Trip
//                 </button>
//             </form>
//         </div>
//     );
// }

import { useState, useRef, useEffect } from "react";
import { X, Upload } from 'lucide-react';
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EditTrip() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const fileInputRef = useRef(null);

    const fetchData = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/trip/viewTrip/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const result = await res.json();
            console.log("Fetched Data from the ViewTrip:", result);
            setData(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch trip data");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        destinations: [],
        newDestination: "",
        price: "",
        duration: "",
        availableSeats: "",
        startDate: "",
        endDate: "",
        photoUrl: null,
        photoFile: null,
        busType: "",
        pickup: "",
        drop: "",
        arrivalTime: "",
        departureTime: "",
        ac: false,
        meal: "",
        accommodation: "",
        activities: "",
        expertGuide: "",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || "",
                description: data.description || "",
                destinations: data.destination || [],
                newDestination: "",
                price: data.price || "",
                duration: data.duration || "",
                availableSeats: data.availableSeats || "",
                startDate: data.startDate || "",
                endDate: data.endDate || "",
                photoUrl: data.photo || null,
                photoFile: null,
                busType: data.busType || "",
                pickup: data.pickup || "",
                drop: data.drop || "",
                arrivalTime: data.arrivalTime || "",
                departureTime: data.departureTime || "",
                ac: data.ac || false,
                meal: data.meal || "",
                accommodation: data.accommodation || "",
                activities: data.activities || "",
                expertGuide: data.expertGuide || "",
            });
        }
    }, [data]);

    const handleAddDestination = () => {
        if (formData.newDestination.trim()) {
            setFormData((prev) => ({
                ...prev,
                destinations: [
                    ...prev.destinations,
                    prev.newDestination.trim(),
                ],
                newDestination: "",
            }));
        }
    };

    const handleRemoveDestination = (index) => {
        setFormData((prev) => ({
            ...prev,
            destinations: prev.destinations.filter((_, i) => i !== index),
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    photoUrl: reader.result,
                    photoFile: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const editedTripData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'destinations') {
                editedTripData.append('destination', JSON.stringify(formData[key]));
            } else if (key === 'photoFile' && formData[key]) {
                editedTripData.append('image', formData[key]);
            } else if (key !== 'photoUrl' && key !== 'newDestination') {
                editedTripData.append(key, formData[key]);
            }
        });

        try {
            const res = await fetch(
                `http://localhost:3000/trip/editTrip/${id}`,
                {
                    method: "PATCH",
                    body: editedTripData,
                    credentials: "include",
                }
            );
            if (res.ok) {
                const data = await res.json();
                console.log("Trip Updated Successfully:", data.message);
                toast.success("Trip Updated Successfully");
                // Optionally reset form or redirect
            } else {
                console.log("Error in updating trip");
                toast.error("Failed to update trip");
            }
        } catch (error) {
            console.error("Error in Updating the trip:", error);
            toast.error("An error occurred while updating the trip");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl"
            >
                <h2 className="text-3xl font-bold mb-6 text-red-500">
                    Edit Your Trip
                </h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-white mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-white mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-white mb-1">
                            Destinations
                        </label>
                        <div className="flex space-x-2">
                            <input
                                id="newDestination"
                                type="text"
                                value={formData.newDestination}
                                onChange={handleChange}
                                className="flex-grow px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddDestination}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.destinations.map((dest, index) => (
                                <span
                                    key={index}
                                    className="bg-red-500 text-white px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                    {dest}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDestination(index)}
                                        className="ml-2 focus:outline-none"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-white mb-1">
                                Price
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-white mb-1">
                                Duration (days)
                            </label>
                            <input
                                id="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="availableSeats" className="block text-white mb-1">
                            Available Seats
                        </label>
                        <input
                            id="availableSeats"
                            type="number"
                            value={formData.availableSeats}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-white mb-1">
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-white mb-1">
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-white mb-1">
                            Trip Photo
                        </label>
                        <div className="mt-1 flex items-center space-x-4">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
                            >
                                <Upload className="mr-1 h-4 w-4" /> Upload Image
                            </button>
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            {formData.photoUrl && (
                                <div className="relative w-24 h-24">
                                    <img
                                        src={formData.photoUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                photoUrl: null,
                                                photoFile: null,
                                            }))
                                        }
                                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="busType" className="block text-white mb-1">
                            Bus Type
                        </label>
                        <select
                            id="busType"
                            value={formData.busType}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="" disabled>Select Bus Type</option>
                            <option value="2x1">2x1</option>
                            <option value="3x2">3x2</option>
                            <option value="2x2">2x2</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pickup" className="block text-white mb-1">
                            Pickup Location
                        </label>
                        <input
                            id="pickup"
                            type="text"
                            value={formData.pickup}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="drop" className="block text-white mb-1">
                            Drop Location
                        </label>
                        <input
                            id="drop"
                            type="text"
                            value={formData.drop}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="arrivalTime" className="block text-white mb-1">
                                Arrival Time
                            </label>
                            <input
                                id="arrivalTime"
                                type="text"
                                value={formData.arrivalTime}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="departureTime" className="block text-white mb-1">
                                Departure Time
                            </label>
                            <input
                                id="departureTime"
                                type="text"
                                value={formData.departureTime}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="ac"
                            type="checkbox"
                            checked={formData.ac}
                            onChange={handleChange}
                            className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <label htmlFor="ac" className="ml-2 block text-white">
                            AC
                        </label>
                    </div>
                    <div>
                        <label htmlFor="meal" className="block text-white mb-1">
                            Meal
                        </label>
                        <input
                            id="meal"
                            type="text"
                            value={formData.meal}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="accommodation" className="block text-white mb-1">
                            Accommodation
                        </label>
                        <input
                            id="accommodation"
                            type="text"
                            value={formData.accommodation}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="activities" className="block text-white mb-1">
                            Activities
                        </label>
                        <input
                            id="activities"
                            type="text"
                            value={formData.activities}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="expertGuide" className="block text-white mb-1">
                            Expert Guide
                        </label>
                        <input
                            id="expertGuide"
                            type="text"
                            value={formData.expertGuide}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full px-4 py-2 flex justify-center bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    {loading ? <AiOutlineLoading3Quarters className="text-2xl animate-spin" /> : 'Edit Trip'}
                </button>
            </form>
        </div>
    );
}