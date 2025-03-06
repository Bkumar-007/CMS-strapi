"use client";
 
import React, { useState, useEffect } from "react";
import MarkdownHTML from "@/components/MarkdownHTML";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Import authentication context
 
export default function Page({ params }) {
  const { slug } = params;
  const [response, setBlog] = useState(null);
  const [postResponse, setPost] = useState(null);
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user info from AuthContext
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken =
          typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
        const headers = {
          Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
        };
 
        // Fetch blog data
        const blogUrl = `http://localhost:1337/api/articles?sort[0]=title:asc&filters[slug][$eq]=${slug}&status=published&locale[0]=en&populate=*`;
        const blogRes = await fetch(blogUrl, { headers, cache: "no-store" });
        const blogResponse = await blogRes.json();
        setBlog(blogResponse);
 
        if (blogResponse?.data?.[0]) {
          document.title = `${blogResponse.data[0].title} | Bharat's Developer Portfolio`;
        }
 
        // Fetch related posts with query filtering directly from API
        if (user?.Gender) {
          const userGender = user.Gender;
          const postsUrl = `http://localhost:1337/api/articles?populate=*&filters[$or][0][restrictedTo][$eq]=${userGender}&filters[$or][1][restrictedTo][$eq]=All`;
          const postRes = await fetch(postsUrl, { headers, cache: "no-store" });
          const postsResponse = await postRes.json();
          setPost(postsResponse.data);
        } else {
          setPost([]); // No user, no posts
        }
       
        // // Fetch media (Uncomment if needed)
        // const mediaUrl = `http://localhost:1337/api/media?populate=*`;
        // const mediaRes = await fetch(mediaUrl, { headers, cache: "no-store" });
        // const media = await mediaRes.json();
        // setMediaData(media);
 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, [slug, user]); // Re-fetch when slug or user changes
 
 
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {/* Blog Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center cursor-default">
              {response?.data?.[0]?.title || "Blog Not Found"}
            </h1>
 
            {/* Author and Date */}
            <div className="flex justify-center items-center text-gray-600 mb-8 cursor-default">
              <div className="text-center">
                <p className="font-medium">
                  Written by {response?.data?.[0]?.author?.name || "Unknown"}
                </p>
                <p>
                  Published on{" "}
                  {response?.data?.[0]?.publishedAt
                    ? new Date(response.data[0].publishedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
                </p>
              </div>
            </div>
 
            {/* Blog Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {response?.data?.[0]?.blocks?.map((item) => {
                switch (item["__component"]) {
                  case "shared.rich-text":
                    return <MarkdownHTML markdown={item.body} key={item.id} />;
 
                  case "shared.quote":
                    return (
                      <blockquote className="my-4" key={item.id}>
                        <p>{item.body}</p>
                        <cite>— {item.title}</cite>
                      </blockquote>
                    );
 
                  case "shared.slider":
                    return (
                      <div key={item.id} className="my-4 slider">
                        <p>Slider content goes here</p>
                      </div>
                    );
 
                  default:
                    return null;
                }
              })}
            </div>
 
            {/* Related Posts Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postResponse?.length > 0 ? (
                  postResponse.map((data) => (
                    <Link href={`/blogpost/${data.slug}`} key={data.id}>
                      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer hover:scale-105 ease-in-out">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {data.title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          {data.description.split(" ").length > 6
                            ? data.description.split(" ").slice(0, 11).join(" ") +
                              "..."
                            : data.description}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center">No related posts found.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}