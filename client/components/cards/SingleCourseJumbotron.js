import { useContext } from "react";
import {Badge, Button} from 'antd'
import { currencyFormatter } from '../../utils/helpers';
import ReactPlayer from 'react-player'
import {
  SafetyOutlined,
  LoadingOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Context } from "../../context";

const SingleCourseJumbotron = ({
  course,
  setPreview,
  preview,
  showModal,
  setShowModal,
  loading,
  handleFreeEnrollment,
  handlePaidEnrollment,
  enrolled,
  setEnrolled,
}) => {
   // destructure
   const {
    name,
    description,
    instructor,
    updateAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

   // context
   const {
    state: { user },
  } = useContext(Context);

 return (
  <div className='jumbotron bg-primary square'>
  <div className='row'>
   <div className='col-md-8'>
      <h1 className='text-light font-weight-bold'>{name}</h1>
      <p className='lead'>
        {description && description.substring(0,160)}...
      </p>
      <Badge
        count={category}
        style={{ backgroundColor:'#03a9f4'}}
        className='pb-4 mr-2'
      />
      <p> Created by {instructor.name}</p>
      <p>Last updated {new Date(updateAt).toLocaleDateString()}</p>
      <h4 className='text-light'>{
        paid ? currencyFormatter({
          currency:'eur',
          amount:price
         
        }) : 'Free'
      }</h4>
   </div>
   <div className='col-md-4'>
       {lessons[0].video && lessons[0].video.Location ? (
         <div
          onClick={() => {
            setPreview(lessons[0].video.Location)
            setShowModal(!showModal)
          }}
         > 
           <ReactPlayer
            className='react-player-div'
            url={lessons[0].video.Location}
            light={image.Location}
            width='100'
            height='225px'
           />
         </div>
       ) : (
         <>
            <img
              src={image.Location}
              alt={name}
              className='img img-fluid'
            />
         </>
       )}
       <Button
            className="mb-3"
            type="danger"
            block
            shape="round"
            icon={<SafetyOutlined />}
            size="large"
            disabled={loading}
            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            // style={{ width: "342px" }}
          >
            {user
              ? enrolled.status
                ? "Go to course"
                : // <Link href={`/user/course/${enrolled.course.slug}`}>
                  //   <a className="text-light"> Go to course</a>
                  // </Link>
                  "Enroll"
              : "Login to enroll"}
          </Button>
   </div>
  </div>
</div>
 )
}

export default SingleCourseJumbotron