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

const AllRoutes = () => {
    return (
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/property-calculator" element={<PropertyCalculator />} />
                    <Route path="/real-estate-brokerage" element={<RealEstateBrokerage />} />
                    <Route path="/property-request" element={<PropertyRequest />} />
                    <Route path="/partner-with-us" element={<PartnerWithUs />} />
                    <Route path="/become-an-associate" element={<BecomeAssociate />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/careers/:jobId" element={<JobDetail />} />
                    <Route path="/careers/:jobId" element={<JobDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:postId" element={<BlogDetail />} />
                </Routes>
    )
}

export default AllRoutes;