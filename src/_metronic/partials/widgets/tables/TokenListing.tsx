import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { TokenEditModal } from '../../../../app/modules/apps/deposit-management/token-edit/tokenEditModal';
import { getTokenDetails } from '../../../../app/api/get/getTokenDetails';
import { deleteTokens } from '../../../../app/api/delete/deleteTokens';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { TokenStatus } from '../../../../app/api/put/tokenStatus';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex: Function;
  data?: any;
  listing: [];
};

const TokenListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setTabIndex,
  data,
  listing,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [packageDetails, setTokenDetails] = useState<string[]>([]);
  const [listingId, setListingId] = useState<string>('');
  const [itemId, setItemId] = useState<string>();

  const [isUserBlock, setIsUserBlock] = useState<boolean>();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const TokenDetail = async (detailId: string) => {
    try {
      const packageId = await getTokenDetails(detailId);
      setTokenDetails(packageId.data);
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('editToken Error', error);
    }
  };

  const DeleteConfirm = () => {
    itemId && deleteToken(itemId);
  };

  const StatusConfirm = () => {
    itemId && changeStatus(itemId);
  };

  const changeStatus = async (tokenId: string) => {
    setIsLoading(true);
    try {
      await TokenStatus(tokenId);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(
        `${
          isUserBlock
            ? 'Your token has been inactive successfully.'
            : 'Your token has been active successfully.'
        }`
      );
    } catch (error) {
      setStateMsg(apiError);
      setBoolState('fail');
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const deleteToken = async (deleteId: string) => {
    setIsLoading(true);
    try {
      await deleteTokens(deleteId);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your token has been deleted successfully.');
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
    setStateMsg('Your token has been edited successfully.');
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
                Token Listing
              </span>
            </h3>
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
                    <th className='ps-4 min-w-150px rounded-start'>Name</th>
                    <th className='min-w-100px'>Symbol</th>
                    <th className='min-w-125px'>Network</th>
                    <th className='min-w-200px'>Address</th>
                    <th className='min-w-75px'>Decimals</th>
                    <th className='min-w-100px'>Status</th>
                    <th className='min-w-125px text-end pe-3'>Actions</th>
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
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.symbol}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.network}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.address}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.decimals}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.is_active ? 'Active' : 'Inactive'}
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
                                  setListingId(item._id);
                                  TokenDetail(item._id);
                                }}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/art/art005.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                              <p
                                onClick={() => {
                                  setItemId(item._id);
                                  setShowDeleteModal(true);
                                }}
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTSVG
                                  path='/media/icons/duotune/general/gen027.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                              <p
                                onClick={() => {
                                  setIsUserBlock(item.is_active);
                                  setItemId(item._id);
                                  setShowConfrimModal(true);
                                }}
                                className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                              >
                                {item.is_active ? (
                                  <KTSVG
                                    path='/media/icons/duotune/custom/toggle001.svg'
                                    className='svg-icon-3'
                                  />
                                ) : (
                                  <KTSVG
                                    path='/media/icons/duotune/custom/toggle002.svg'
                                    className='svg-icon-3'
                                  />
                                )}
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
      <TokenEditModal
        show={showCreateAppModal}
        data={packageDetails}
        listingId={listingId}
        listing={listing}
        setApiError={setApiError}
        setRefreshList={setRefreshList}
        SuccessFunction={SuccessEdit}
        FailFunction={FailedEdit}
        handleClose={() => setShowCreateAppModal(false)}
      />

      <ConfrimModal
        show={showDeleteModal}
        confirmProcess={DeleteConfirm}
        modalTitle={'delete'}
        handleClose={() => setShowDeleteModal(false)}
      />

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={StatusConfirm}
        modalTitle={isUserBlock ? 'inactive' : 'active'}
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { TokenListing };
