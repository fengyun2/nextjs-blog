import Image from 'next/image';

export default function MyProfilePic() {
  return (
    <section className='mx-auto w-full'>
      <Image
        className='mx-auto mt-8 rounded-full border-4 border-black shadow-black drop-shadow-xl dark:border-slate-500'
        src={'/images/profile-photo.png'}
        width={200}
        height={200}
        alt='Spring'
        priority
      />
    </section>
  );
}
