import { useState, useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import PreviewModal from '../../components/modal/PreviewModal';
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron';
import SingleCourseLessons from '../../components/cards/SingleCourseLessons';

const SingleCourse = ({course}) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");

  const router = useRouter();
  const { slug } = router.query;

 

  return (
    <>
    
        <SingleCourseJumbotron
           course={course}
           showModal={showModal}
           setShowModal={setShowModal}
           setPreview={setPreview}
           preview={preview}
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