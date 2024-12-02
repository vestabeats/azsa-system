import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import Tabs from '../components/Tabs';
import { formatter } from '../utils';
import { useDeleteAllAttestationMutation, useGetAdminAttestationQuery } from '../redux/slices/api/attestationApiSlice';
import AttestDialog from '../components/AttestDialog';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { MdAttachFile, MdDelete } from 'react-icons/md';
import { toast } from 'sonner';
import ConfirmationDialog from '../components/Dialogs';
import AddAttestation from '../components/AddAttestation';

const TABS = [
  { title: "Granted" },
  { title: "Requested" }
];

const AllAttestations = () => {
  const { searchvalue } = useSelector((state: any) => state.auth);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [adata, setAdata] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [type, setType] = useState<"delete" | "restore" | "deleteAll" | "restoreAll">("delete");

  const { data, isLoading, isError, refetch } = useGetAdminAttestationQuery({ search: searchvalue });
  const [deleteAttest] = useDeleteAllAttestationMutation();

  useEffect(() => {
    if (data) {
      console.log("Fetched Data:", JSON.stringify(data, null, 2));
    }
  }, [data]);

  const deleteAll = async () => {
    try {
      const result = await deleteAttest({});
      toast.success(result?.data?.message);
      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
const addAttClick=(ar:any)=>{
  setOpen(true)
  setAdata(ar)

}
  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const attestations = data?.attestations || [];
  console.log("attestations:", JSON.stringify(attestations, null, 2));
  
  // Adjust filter logic if 'requested' field is not present
  const allAttestations = attestations.filter((stat: any) => stat?.requested === false );
  const requestedAttestations = attestations.filter((stat: any) => stat?.requested === true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        <h2 className='flex justify-center text-white text-3xl font-bold'>
          Documents
        </h2>
      </div>
      <div className='rounded-lg p-4'>
        <Tabs
          tabs={TABS}
          selected={selectedTab}
          setSelected={setSelectedTab}
        >
          {selectedTab === 0 && (
            <>
              <Button
                label='Delete All'
                icon={<MdDelete className='text-lg hidden md:flex' />}
                className='flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
                onClick={deleteAllClick}
              />
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mt-4'>
                {allAttestations.length > 0 ? (
                  allAttestations.map((stat: any) => (
                    <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
                      <div className='h-full flex flex-1 flex-col justify-between'>
                        <p className='text-base text-gray-600'>{stat?.title?.toUpperCase()}</p>
                        <p className='text-base text-gray-600 rounded'>{stat?.student?.firstname.split(" ")} {stat?.student?.surname}</p>
                      </div>
                      <div className='flex flex-col gap-2 p-1 justify-end items-end'>
                        <AttestDialog attest={stat} />
                        <p className='text-base text-gray-600 bg-green-200 px-1 hover:bg-green-100'>{stat?.student?.wilaya}</p>
                        <span className='text-sm text-gray-400'>{formatter(stat?.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No items to display</div>
                )}
              </div>
            </>
          )}
          {selectedTab === 1 && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mt-4'>
                {requestedAttestations.length > 0 ? (
                  requestedAttestations.map((stat: any) => (
                    <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
                      <div className='h-full flex flex-1 flex-col justify-between '>
                        <p className='text-base text-black'>{stat?.title?.toUpperCase()}</p>
                        <p className='text-base text-nlack bg-yellow-200 px-1 hover:bg-yellow-100 text-center w-fit flex'>{stat?.student?.passportnumber.toUpperCase()}</p>
                        <p className='text-base text-black rounded'>{stat?.student?.firstname.split(" ")} {stat?.student?.surname}</p>
                        
                      </div>

                      <div className='flex flex-col gap-2 p-1 justify-end items-end'>
                       
                        <p className='text-base text-gray-600 bg-green-200 px-1 hover:bg-green-100'>{stat?.student?.wilaya}</p>
                        
                        <Button label=""
                
                onClick={() => addAttClick(stat)}
                  icon={<MdAttachFile className='text-xl text-gray-600  ' />}
                />
                        <span className='text-sm text-gray-400'>{formatter(stat?.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No requested items yet.</div>
                )}
              </div>
            </>
          )}
        </Tabs>
      </div>
      <AddAttestation open={open} setOpen={setOpen} AData={adata} setAData={setAdata} userId=''/>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteAll}
      />
    </>
  );
};

export default AllAttestations;
