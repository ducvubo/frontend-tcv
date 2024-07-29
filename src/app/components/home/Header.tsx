import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import React from 'react'
import { IoMdSearch } from 'react-icons/io'
import {
  FaChartLine,
  FaCheckToSlot,
  FaFilePen,
  FaLaptopCode,
  FaNewspaper,
  FaRegCircleUser,
  FaRegFileLines,
  FaSackDollar,
  FaScaleBalanced
} from 'react-icons/fa6'
import { LiaCoinsSolid, LiaMedalSolid, LiaUserEditSolid } from 'react-icons/lia'
import { RiFileUserLine } from 'react-icons/ri'
import { ImProfile } from 'react-icons/im'
import { LuFileCheck, LuFolderSearch2, LuGraduationCap, LuShieldCheck, LuShieldClose } from 'react-icons/lu'
import { WiStars } from 'react-icons/wi'
import { BiBuildings, BiPencil } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { CiMobile3 } from 'react-icons/ci'
import { PiFolderOpenFill, PiUserList } from 'react-icons/pi'
import { TbChartHistogram } from 'react-icons/tb'
import { IoBriefcaseOutline } from 'react-icons/io5'
import { FaMoneyCheckAlt, FaRegCompass } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function Header() {
  return (
    <section className='h-[72px] mx-6 flex'>
      <div className='mr-5'>
        <Image src={'/images/logo.webp'} alt='logo' width={177} height={72} />
      </div>
      <div className='w-2/5 flex justify-center items-center ml-5'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span className='font-semibold hover:text-[#00b14f]'>Việc làm</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-3 md:w-[200px] lg:w-[350px]'>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <IoMdSearch color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Tìm việc làm
                      </span>
                    </div>
                  </li>
                  <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaCheckToSlot color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Việc làm phù hợp
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaLaptopCode color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Việc làm IT
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <LiaMedalSolid color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Việc làm senior
                      </span>
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span className='font-semibold hover:text-[#00b14f]'>Hồ sơ & CV</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-3 md:w-[350px] lg:w-[400px]'>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <RiFileUserLine color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>Mẫu CV</span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaRegFileLines color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Mẫu Cover letter
                      </span>
                    </div>
                  </li>
                  <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <ImProfile color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Dịch vụ tư vấn CV
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaFilePen color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Hướng dẫn viết CV theo ngành nghề
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <LuFileCheck color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Thư viện CV theo ngành nghề
                      </span>
                    </div>
                  </li>
                  <div className='border-b-[1px] border-[#e9eaec] w-full'></div>

                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaRegCircleUser color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        TopCV Profile
                      </span>
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span className='font-semibold hover:text-[#00b14f]'>Công ty</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-3 md:w-[200px] lg:w-[350px]'>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <BiBuildings color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Danh sách công ty
                      </span>
                    </div>
                  </li>
                  <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <BsStars color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Top công ty
                      </span>
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span className='font-semibold hover:text-[#00b14f]'>Công cụ</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='flex flex-row'>
                  <ul className='grid gap-3 p-3 md:w-[200px] lg:w-[350px] h-72'>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <PiUserList color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Trắc nghiệm tính cách MBTI
                        </span>
                      </div>
                    </li>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex justify-start items-center ml-3 gap-3 '>
                        <LiaUserEditSolid color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Trắc nghiệm MI
                        </span>
                      </div>
                    </li>
                    <div className='border-b-[1px] border-[#e9eaec] w-full '></div>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <BiPencil color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          TopCV Skills
                        </span>
                      </div>
                    </li>
                    <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <LuGraduationCap color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Khóa học
                        </span>
                      </div>
                    </li>
                    <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <CiMobile3 color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Mobile App TopCV
                        </span>
                      </div>
                    </li>
                  </ul>
                  <ul className='grid gap-3 p-3 md:w-[200px] lg:w-[350px]'>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <FaScaleBalanced color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Tính lương GROSS - NET
                        </span>
                      </div>
                    </li>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <FaChartLine color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Tính thuế thu nhập cá nhân
                        </span>
                      </div>
                    </li>
                    <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <LuShieldClose color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Tính mức hưởng bảo hiểm thất nghiệp
                        </span>
                      </div>
                    </li>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <LuShieldCheck color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Tính bảo hiểm xã hội một lần
                        </span>
                      </div>
                    </li>
                    <div className='border-b-[1px] border-[#e9eaec] w-full'></div>

                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <LiaCoinsSolid color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Tính lãi xuất kép
                        </span>
                      </div>
                    </li>
                    <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                      <div className='flex  justify-start items-center ml-3 gap-3'>
                        <FaSackDollar color='#00b14f' fontSize='1.1em' />
                        <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                          Lập kế hoạch tiết kiệm
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span className='font-semibold hover:text-[#00b14f] '>Cẩm nang nghề nghiệp</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-3 md:w-[200px] lg:w-[350px]'>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaNewspaper color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Trang chủ cẩn nang nghề nghiệp
                      </span>
                    </div>
                  </li>
                  <div className='border-b-[1px] border-[#e9eaec] w-full'></div>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaRegCompass color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Định hướng nghề nghiệp
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <LuFolderSearch2 color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Bí kíp tìm việc
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <FaMoneyCheckAlt color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Chế độ lương thưởng
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <PiFolderOpenFill color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Kiến thức chuyên ngành
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <IoBriefcaseOutline color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Hành trang nghề nghiệp
                      </span>
                    </div>
                  </li>
                  <li className='group flex bg-[#f4f5f5] h-12 rounded-md'>
                    <div className='flex  justify-start items-center ml-3 gap-3'>
                      <TbChartHistogram color='#00b14f' fontSize='1.1em' />
                      <span className='group-hover:text-[#00b14f] text-sm font-semibold cursor-pointer'>
                        Thị trường và xu hướng tuyển dụng
                      </span>
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='ml-64 mt-4 flex gap-4'>
        <Button variant='outline'>
          <Link
            href={`${process.env.NEXT_PUBLIC_HOST_SSO}/auth/login?apikey=${process.env.NEXT_PUBLIC_API_KEY_SSO}&serviceUrl=${process.env.NEXT_PUBLIC_HOST_FRONTEND}`}
          >
            Đăng nhập
          </Link>
        </Button>
        <Button variant='topcv'>
          <Link
            href={`${process.env.NEXT_PUBLIC_HOST_SSO}/auth/register?apikey=${process.env.NEXT_PUBLIC_API_KEY_SSO}&serviceUrl=${process.env.NEXT_PUBLIC_HOST_FRONTEND}`}
          >
            Đăng ký
          </Link>
        </Button>
        <Button>Đăng tuyển & tìm hồ sơ</Button>
      </div>
    </section>
  )
}
