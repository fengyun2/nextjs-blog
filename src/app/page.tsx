import Posts from './components/Posts';
import MyProfilePic from './components/MyProfilePic';

export default function Home() {
  return (
    <div className='mx-auto'>
      <MyProfilePic />
      <p className='mb-12 mt-12 text-center text-3xl dark:text-white'>
        Hello and Welcome 👋&nbsp;
        <span className='whitespace-nowrap'>
          I'm <span className='font-bold'>Spring</span>
        </span>
      </p>
      <Posts />
    </div>
  );
}
