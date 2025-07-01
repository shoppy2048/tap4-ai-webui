/* eslint-disable react/jsx-no-target-blank */

import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, GamepadIcon, SquareArrowOutUpRight, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WebNavCard({
  name,
  thumbnail_url,
  title,
  url,
  content,
  star_rating,
  category_name,
}: WebNavigation) {
  const t = useTranslations('Home');

  // 渲染评分星星
  const renderStars = () => {
    const stars = [];
    const rating = star_rating || 0;
    for (let i = 0; i < 5; i += 1) {
      stars.push(
        <Star key={i} className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />,
      );
    }
    return stars;
  };

  return (
    <div className='flex h-[210px] flex-col gap-3 rounded-xl bg-[#2C2D36] p-1 transition-all duration-300 hover:shadow-lg lg:h-[343px]'>
      <Link href={`/ai/${name}`} title={title} className='group relative'>
        <img
          src={thumbnail_url || ''}
          alt={title}
          title={title}
          width={310}
          height={174}
          className='aspect-[310/174] w-full rounded-xl bg-white/40 hover:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-xl bg-black bg-opacity-50 text-xl text-white transition-all duration-200 group-hover:flex'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
        {category_name && (
          <div className='absolute left-2 top-2 flex items-center rounded-md bg-black/70 px-2 py-1 text-xs text-white'>
            <GamepadIcon className='mr-1 size-3' />
            {category_name}
          </div>
        )}
      </Link>
      <div className='flex items-center justify-between px-[6px]'>
        <a href={url} title={title} target='_blank' rel='nofollow' className='hover:opacity-70'>
          <h3 className='line-clamp-1 flex-1 text-sm font-bold lg:text-base'>{title}</h3>
        </a>
        <a href={url} title={title} target='_blank' rel='nofollow' className='hover:opacity-70'>
          <SquareArrowOutUpRight className='size-5' />
          <span className='sr-only'>{title}</span>
        </a>
      </div>
      <div className='-mt-1 flex items-center px-[6px]'>{renderStars()}</div>
      <p className='line-clamp-3 px-[6px] text-xs text-white/70 lg:line-clamp-4 lg:text-sm'>{content}</p>
    </div>
  );
}
