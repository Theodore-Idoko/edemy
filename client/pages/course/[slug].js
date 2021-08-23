import { useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import PreviewModal from '../../components/modal/PreviewModal';
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron';
import SingleCourseLessons from '../../components/cards/SingleCourseLessons';
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";



const SingleCourse = ({course}) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  // context
  const {
    state: { user },
  } = useContext(Context);


  useEffect(() => {
    // is already enrolled?
    if (user && course) checkEnrollment();
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
     //console.log("CHECK ENROLLMENT => ", data);
    setEnrolled(data);
  };

  const handlePaidEnrollment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!user) return router.push("/login");
      // if user is already enrolled, redirect to course page
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      // console.log("enroll to this course > ", course._id);
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      // console.log("PAID ENROLLMENT => ", data);
      // load stripe for payment
      // on successful payment, user will get redirected to /stripe/success page
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed, Try again.");
      // console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!user) return router.push("/login");
      // if user is already enrolled, redirect to course page
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      // console.log("enroll to this course > ", course._id);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      console.log("FREE ENROLLMENT => ", data);
      toast(data.message);
      // redirect user to course page
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Enrollment failed, Try again.");
      console.log(err);
      setLoading(false);
    }
  };
 

  return (
    <>
    
        <SingleCourseJumbotron
           course={course}
           showModal={showModal}
           setShowModal={setShowModal}
           setPreview={setPreview}
           preview={preview}
           loading={loading}
           user={user}
           handleFreeEnrollment={handleFreeEnrollment}
           handlePaidEnrollment={handlePaidEnrollment}
           enrolled={enrolled}
           setEnrolled={setEnrolled}
        />
        <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        />
          
        {course.lessons && (
          <SingleCourseLessons 
            lessons={course.lessons}
            setPreview={setPreview}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(
    `${process.env.API}/course/${query.slug}`
  );
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;