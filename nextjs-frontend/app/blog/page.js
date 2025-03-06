// "use client"; // Ensures this runs only in the browser

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext"; // Import authentication context

// const Blog = () => {
//   const { user } = useAuth(); // Get user info from AuthContext
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       // try {
//       //   const jwtToken = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
//       //   const headers = {
//       //     Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
//       //   };

//       //   const res = await fetch("http://localhost:1337/api/articles?populate=*", {
//       //     headers,
//       //     cache: "no-store",
//       //   });

//       //   const response = await res.json();
//       //   console.log(user?.Gender);
        
//       //   if (user?.Gender) {
//       //     // Filter blogs based on user gender
//       //     const filteredBlogs = response.data.filter(
//       //       (article) => article.restrictedTo === "All" || article.restrictedTo === user.Gender
//       //     );
//       //     setBlogs(filteredBlogs);
//       //   } else {
//       //     // If no user is logged in, show only unrestricted articles
//       //     setBlogs([]);
//       //   }
//       // } catch (error) {
//       //   console.error("Error fetching blogs:", error);
//       // } finally {
//       //   setLoading(false);
//       // }

//       try {
//         if (!user?.Gender) {
//           setBlogs([]); // No user, no blogs
//           return;
//         }
    
//         const jwtToken = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
//         const headers = {
//           Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
//         };
    
//         const userGender = user.Gender; // Assume this is 'Male' or 'Female'
//         const query = `filters[$or][0][restrictedTo][$eq]=${userGender}&filters[$or][1][restrictedTo][$eq]=All`;
        
//         const url = `http://localhost:1337/api/articles?populate=*&query=filters[$or][0][restrictedTo][$eq]=${userGender}&filters[$or][1][restrictedTo][$eq]=All`;
    
//         const res = await fetch(url, { headers });
//         const response = await res.json();
        
//         console.log(response);
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [user]);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blogs</h1>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs?.length > 0 ? (
//               blogs.map((data) => (
//                 <div
//                   key={data?.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden dark:border-2 hover:scale-105 ease-in-out duration-300"
//                 >
//                   {/* Blog Image */}
//                   {data?.cover?.url && (
//                     <img
//                       src={`http://localhost:1337${data.cover.url}`}
//                       alt={data?.title}
//                       className="w-full h-64 object-cover"
//                     />
//                   )}

//                   {/* Blog Content */}
//                   <div className="p-4">
//                     <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>

//                     {/* Description (Shortened) */}
//                     <p className="mb-4">
//                       {data?.description?.split(" ").length > 6
//                         ? data?.description.split(" ").slice(0, 11).join(" ") + "..."
//                         : data.description}
//                     </p>

//                     {/* Author & Date */}
//                     <div className="text-sm mb-4">
//                       <span>By {data?.author?.name}</span> |{" "}
//                       <span>
//                         {new Date(data?.publishedAt).toLocaleDateString("en-GB", {
//                           day: "2-digit",
//                           month: "long",
//                           year: "numeric",
//                         })}
//                       </span>
//                     </div>

//                     {/* Read More Button */}
//                     <Link href={`/blogpost/${data?.slug}`}>
//                       <Button className="m-2" variant="outline">
//                         Read More
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center">No articles available for your access.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;


"use client"; // Ensures this runs only in the browser

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // Import authentication context

const Blog = () => {
  const { user } = useAuth(); // Get user info from AuthContext
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      // try {
      //   const jwtToken = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
      //   const headers = {
      //     Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
      //   };

      //   const res = await fetch("http://localhost:1337/api/articles?populate=*", {
      //     headers,
      //     cache: "no-store",
      //   });

      //   const response = await res.json();
      //   console.log(user?.Gender);
        
      //   if (user?.Gender) {
      //     // Filter blogs based on user gender
      //     const filteredBlogs = response.data.filter(
      //       (article) => article.restrictedTo === "All" || article.restrictedTo === user.Gender
      //     );
      //     setBlogs(filteredBlogs);
      //   } else {
      //     // If no user is logged in, show only unrestricted articles
      //     setBlogs([]);
      //   }
      // } catch (error) {
      //   console.error("Error fetching blogs:", error);
      // } finally {
      //   setLoading(false);
      // }

      try {
        if (!user?.Gender) {
          setBlogs([]); // No user, no blogs
          return;
        }
    
        const jwtToken = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
        const headers = {
          Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
        };
    
        const userGender = user.Gender; // Assume this is 'Male' or 'Female'
        const query = `filters[$or][0][restrictedTo][$eq]=${userGender}&filters[$or][1][restrictedTo][$eq]=All`;
        
        const url = `http://localhost:1337/api/articles?populate=*&${query}`; // Fixed query string issue
    
        const res = await fetch(url, { headers });
        const response = await res.json();
        
        console.log(response);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blogs</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.length > 0 ? (
              blogs.map((data) => (
                <div
                  key={data?.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden dark:border-2 hover:scale-105 ease-in-out duration-300"
                >
                  {/* Blog Image */}
                  {data?.cover?.url && (
                    <img
                      src={`http://localhost:1337${data.cover.url}`}
                      alt={data?.title}
                      className="w-full h-64 object-cover"
                    />
                  )}

                  {/* Blog Content */}
                  <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>

                    {/* Description (Shortened) */}
                    <p className="mb-4">
                      {data?.description?.split(" ").length > 6
                        ? data?.description.split(" ").slice(0, 11).join(" ") + "..."
                        : data.description}
                    </p>

                    {/* Author & Date */}
                    <div className="text-sm mb-4">
                      <span>By {data?.author?.name}</span> |{" "}
                      <span>
                        {new Date(data?.publishedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Read More Button */}
                    <Link href={`/blogpost/${data?.slug}`}>
                      <Button className="m-2" variant="outline">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No articles available for your access.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
