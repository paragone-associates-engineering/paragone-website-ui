import { Routes, Route } from "react-router-dom";
import Home from "../home";
import AboutUs from "../about";
import PropertyCalculator from "../property/calculator";
import RealEstateBrokerage from "../real-estate-brokerage";
import PropertyRequest from "../property/request";
import PartnerWithUs from "../become-partner";
import BecomeAssociate from "../associates";
import Careers from "../career";
import JobDetail from "../career/details";
import BlogDetail from "../blog/details";
import Blog from "../blog";
import ReferAndEarn from "../refer-and-earn";
import PropertyManagement from "../property/management";
import Contact from "../contact";
import Listings from "../property/listings/pages/listings";
import FilteredListings from "../property/listings/pages/filtered-listings";
import LocationListings from "../property/listings/pages/location-listings";
import PropertyDetailsPage from "../property/listings/pages/property-details";
import SubscribePage from "../subscribe";

const AllRoutes = () => {
    return (
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/property-calculator" element={<PropertyCalculator />} />
                    <Route path="/sell-as-a-company" element={<SubscribePage />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/listings/:propertyId" element={<PropertyDetailsPage />} />
                    <Route path="/listings/location/:locationId" element={<LocationListings />} />
                    <Route path="/listings/filter" element={<FilteredListings />} />
                    <Route path="/real-estate-brokerage" element={<RealEstateBrokerage />} />
                    <Route path="/property-request" element={<PropertyRequest />} />
                    <Route path="/property-management" element={<PropertyManagement />} />
                    <Route path="/partner-with-us" element={<PartnerWithUs />} />
                    <Route path="/become-an-associate" element={<BecomeAssociate />} />
                    <Route path="/refer-and-earn" element={<ReferAndEarn />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/careers/:jobId" element={<JobDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:postId" element={<BlogDetail />} />
                    <Route path="/contact-us" element={<Contact />} />
                </Routes>
    )
}

export default AllRoutes;