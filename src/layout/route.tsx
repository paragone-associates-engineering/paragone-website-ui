import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../common/loader';
import ResourcesListing from '../resources';
import ResourceDetails from '../resources/details';
import RecruitmentConsentPage from '../career/recruitment-policy';
import PaymentConfirmation from '../common/payment-confirmation';

const Home = lazy(() => import('../home'));
const AboutUs = lazy(() => import('../about'));
const PropertyCalculator = lazy(() => import('../property/calculator'));
const RealEstateBrokerage = lazy(() => import('../real-estate-brokerage'));
const PropertyRequest = lazy(() => import('../property/request'));
const PartnerWithUs = lazy(() => import('../become-partner'));
const BecomeAssociate = lazy(() => import('../associates'));
const Careers = lazy(() => import('../career'));
const JobDetail = lazy(() => import('../career/details'));
const Blog = lazy(() => import('../blog'));
const BlogDetail = lazy(() => import('../blog/details'));
const ReferAndEarn = lazy(() => import('../refer-and-earn'));
const PropertyManagement = lazy(() => import('../property/management'));
const Contact = lazy(() => import('../contact'));
const Listings = lazy(() => import('../property/listings/pages/listings'));
const FilteredListings = lazy(() => import('../property/listings/pages/filtered-listings'));
const LocationListings = lazy(() => import('../property/listings/pages/location-listings'));
const PropertyDetailsPage = lazy(() => import('../property/listings/pages/property-details'));
const SubscribePage = lazy(() => import('../subscribe'));
const NotFound = lazy(() => import('./not-found'));
const EventsListing = lazy(() => import('../events/pages/event-listings'));
const EventDetails = lazy(() => import('../events/pages/event-details'));

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/property-calculator" element={<PropertyCalculator />} />
        <Route path="/sell-as-a-company" element={<SubscribePage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:propertyId" element={<PropertyDetailsPage />} />
        <Route path="/listings/regions" element={<LocationListings />} />
        <Route path="/listings/filter" element={<FilteredListings />} />
        <Route path="/real-estate-brokerage" element={<RealEstateBrokerage />} />
        <Route path="/property-request" element={<PropertyRequest />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/become-an-associate" element={<BecomeAssociate />} />
        <Route path="/refer-and-earn" element={<ReferAndEarn />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/recruitment-policy" element={<RecruitmentConsentPage />} />
        <Route path="/careers/:jobId" element={<JobDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogDetail />} />
        <Route path="/events" element={<EventsListing />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/resources" element={<ResourcesListing />} />
        <Route path="/resources/:resourceId" element={<ResourceDetails />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
