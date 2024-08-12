import GetDataEdit from '../_component/GetDataEdit'
export default function FormCompany({ params }: { params: { slug: string } }) {
  return (
    <>
      <span className='font-bold text-2xl text-[#00b14f] pt-20'>
        {params.slug === 'add' ? 'Thêm Job' : 'Chỉnh sửa thông tin Job'}
      </span>
      <GetDataEdit params={params} />
    </>
  )
}
