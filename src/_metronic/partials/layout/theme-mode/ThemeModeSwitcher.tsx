import clsx from 'clsx';
import { KTSVG } from '../../../helpers';
import { ThemeModeType, useThemeMode } from './ThemeModeProvider';

type Props = {
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
  menuPlacement?: string;
  menuTrigger?: string;
};

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'svg-icon-2',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode);
    updateMode(_mode);
  };

  return (
    <>
      {/* begin::Menu toggle */}
      <p
        className={clsx('btn btn-icon mb-0', toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach='parent'
        data-kt-menu-placement={menuPlacement}
      >
        {mode === 'dark' && (
          <KTSVG
            path='/media/icons/duotune/general/gen061.svg'
            className={clsx('theme-light-hide', toggleBtnIconClass)}
          />
        )}

        {mode === 'light' && (
          <KTSVG
            path='/media/icons/duotune/general/gen060.svg'
            className={clsx('theme-dark-hide', toggleBtnIconClass)}
          />
        )}
      </p>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <p
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'light',
            })}
            onClick={() => switchMode('light')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <KTSVG
                path='/media/icons/duotune/general/gen060.svg'
                className='svg-icon-3'
              />
            </span>
            <span className='menu-title'>Light</span>
          </p>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <p
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'dark',
            })}
            onClick={() => switchMode('dark')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <KTSVG
                path='/media/icons/duotune/general/gen061.svg'
                className='svg-icon-3'
              />
            </span>
            <span className='menu-title'>Dark</span>
          </p>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <p
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'system',
            })}
            onClick={() => switchMode('system')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <KTSVG
                path='/media/icons/duotune/general/gen062.svg'
                className='svg-icon-3'
              />
            </span>
            <span className='menu-title'>System</span>
          </p>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { ThemeModeSwitcher };
