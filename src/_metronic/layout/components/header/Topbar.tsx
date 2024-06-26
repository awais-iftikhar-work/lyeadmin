import clsx from 'clsx';
import { FC } from 'react';
import ValantisLogo from '../../../../app/modules/components/svg/ValantisLogo';
import { KTSVG } from '../../../helpers';
import { HeaderUserMenu, ThemeModeSwitcher } from '../../../partials';
import { useLayout } from '../../core';

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';

const Topbar: FC = () => {
  const { config } = useLayout();

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* begin::Theme mode */}
      {/* <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
      >
        <ThemeModeSwitcher
          toggleBtnClass={clsx(
            'btn-active-light-primary btn-custom',
            toolbarButtonHeightClass
          )}
        />
      </div> */}
      {/* end::Theme mode */}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx(
            'cursor-pointer symbol',
            toolbarUserAvatarHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <div className='h-35px logo bg-light'>
            <ValantisLogo />
          </div>
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div
          className='d-flex align-items-center d-lg-none ms-2 me-n3'
          title='Show header menu'
        >
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG
              path='/media/icons/duotune/text/txt001.svg'
              className='svg-icon-1'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Topbar };
