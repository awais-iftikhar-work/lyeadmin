import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { deletePackages } from '../../../../app/api/delete/deletePackages';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import moment from 'moment';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { FuelType } from '../../../../app/modules/apps/fuel-management/types';
import { deleteFuelType } from '../../../../app/api/fuelType.ts';
import { usePathName } from '../../../../app/hook/usePathName';
import { routes } from '../../../../app/utils/constants';
import { CustomModal } from '../../../layout/components/Modal';
import FuelsAddEdit from '../../../../app/modules/apps/fuel-management/fuels/fuels-add-edit';
type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex: Function;
  data?: any;
};

const FuelListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setTabIndex,
  data,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [listDetails, setListDetails] = useState<FuelType|null>(null);
  const [itemId, setItemId] = useState<string>();

  const [isloading, setIsLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const {route} = usePathName()

  const PackageDetail = async (data: FuelType|null) => {

    try {
      setListDetails(data)
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('editPackage Error', error);
    }
  };



  const deletePackageHandler = async () => {

    if(!itemId) return
    setIsLoading(true);
    try {
      const data = await deleteFuelType(itemId);
      console.log(data);
      
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(data.message)
    } catch (error) {
      setStateMsg(apiError);
      setBoolState('fail');
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const SuccessEdit = () => {
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Your packages has been edited successfully.');
  };

  const FailedEdit = async (error: string) => {
    setStateMsg(error);
    setBoolState('fail');
    setShowToast(true);
  };

  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>
              {routes[route as keyof typeof routes] } Listing
              </span>
            </h3>
            <button
              type={'button'}
              className='btn btn-success me-2'
              onClick={() => {
                PackageDetail(null);
              }}
            >
              Add {routes[route as keyof typeof routes] } Type
            </button>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-150px rounded-start'>Fuel Type</th>
                    <th className='min-w-200px'>Created At</th>
                    <th className='min-w-200px'>Updated At</th>                 
                    <th className='min-w-100px text-end pe-3'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {data?.length === 0 ? (
                    loading ? (
                      <tr className='table-loading'>
                        <UsersListLoading />
                      </tr>
                    ) : (
                      <tr className='table-noData'>
                        <h4 className='no-data mb-0 mt-4'>No data found</h4>
                      </tr>
                    )
                  ) : (
                    <>
                      {(loading || isloading) && (
                        <tr className='listing-loading'>
                          <UsersListLoading />
                        </tr>
                      )}
                      {data?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className='ps-4'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                   {item.typeName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.created_at).format(
                                'DD-MMM-YYYY, HH:mm:ss'
                              )}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.updated_at).format(
                                'DD-MMM-YYYY, HH:mm:ss'
                              )}
                            </p>
                          </td>

                    
                          <td>
                            <div className='d-flex justify-content-end flex-shrink-0'>
                              <p
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                id='pkg_edit_modal'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                                onClick={() => {
                                  PackageDetail(item);
                                }}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/art/art005.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                              <p
                                onClick={() => {
                                  setItemId(item.id);
                                  setShowConfrimModal(true);
                                }}
                                className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                              > 
                                  <i className="bi bi-trash-fill"></i>
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
        <Toast
          showToast={showToast}
          state={boolState}
          setShowToast={setShowToast}
          message={stateMsg}
        />
      </div>
      <CustomModal
                show={showCreateAppModal}
                data={listDetails}
                handleClose={() => setShowCreateAppModal(false)}
      >
        <FuelsAddEdit
          heading={false}
          data={listDetails}
          setApiError={setApiError}
          setRefreshList={setRefreshList}
          SuccessFunction={SuccessEdit}
          FailFunction={FailedEdit}
          setTabIndex={setTabIndex}
          handleClose={() => setShowCreateAppModal(false)}
        />
      </CustomModal>
     


      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={deletePackageHandler}
        modalTitle={'Delete Fuel'}
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { FuelListing };
