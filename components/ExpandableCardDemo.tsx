/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { projects } from '@/data';

export function ExpandableCardDemo() {
  const [active, setActive] = useState<
    (typeof projects)[number] | boolean | null
  >(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 h-full w-full z-10'
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className='fixed inset-0 grid place-items-center z-[100]'>
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className='flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6'
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className='w-full max-w-[600px] h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden'
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.img}
                  alt={active.title}
                  className='w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top'
                />
              </motion.div>
              <div>
                <div className='flex justify-between items-start p-4'>
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className='font-medium text-neutral-700 dark:text-neutral-200 text-base'
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.des}-${id}`}
                      className='text-neutral-600 dark:text-neutral-400 text-base'
                    >
                      {active.des}
                    </motion.p>
                  </div>
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target='_blank'
                    className='px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white'
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className='pt-4 relative px-4'>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]'
                  >
                    {typeof active.content === 'function'
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-16'>
        {projects.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            className=''
          >
            <div className='flex flex-col items-center justify-center p-4 gap-16 mt-10 group border border-gray-600 rounded-lg'>
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <div className='relative'>
                  <div
                    className='relative w-full h-full overflow-hidden rounded-3xl'
                    style={{ backgroundColor: '#13162D' }}
                  >
                    <img src='/bg.png' alt='bgimg' />
                  </div>
                  <img
                    src={card.img}
                    alt='cover'
                    className='z-10 absolute top-0 group-hover:scale-105 group-hover:duration-300 p-2'
                  />
                </div>
                <div className='flex items-center mt-8'>
                  {card.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className='border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
                      style={{ transform: `translateX(-${5 * index + 2}px)` }}
                    >
                      <img src={icon} alt='icon' className='p-2' />
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className='flex justify-center md:justify-start items-center flex-col -mt-8'>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className='font-medium text-neutral-800 dark:text-neutral-200 text-base'
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.des}-${id}`}
                  className='text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base'
                >
                  {card.des}
                </motion.p>
              </div>
             <div className="flex justify-between px-4 w-full -mt-8">
               <button
                onClick={() => setActive(card)}
                className=' px-4 py-[6px] text-xs rounded-full bg-blue-500 text-white hover:bg-blue-600 text-left'
              >
               View Details
              </button>
               <button
            
                className=' px-4 py-[6px] text-xs rounded-full bg-blue-500 text-white hover:bg-blue-600 text-left'
              >
               Live Link
              </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-4 w-4 text-black'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M18 6l-12 12' />
      <path d='M6 6l12 12' />
    </motion.svg>
  );
};
