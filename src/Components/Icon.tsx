import * as React from 'react';
import {
  BiCheckCircle,
  BiCreditCard,
  BiMoney,
  BiTransfer,
  BiDotsVertical,
  BiListPlus,
  BiLogIn,
} from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  FiEdit,
  FiInfo,
  FiMinimize,
  FiRotateCw,
  FiShoppingBag,
  FiUpload,
  FiExternalLink,
} from 'react-icons/fi';
import {
  BsCreditCardFill,
  BsFillFilePersonFill,
  BsCheckLg,
  BsTagFill,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsArrowClockwise,
} from 'react-icons/bs';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiTwotoneHome,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import { HiCheckCircle, HiExclamation, HiX } from 'react-icons/hi';
import {
  MdDelete,
  MdArrowDropDown,
  MdInsights,
  MdCancel,
} from 'react-icons/md';
import { SiCashapp, SiSquare } from 'react-icons/si';
import { FaUserEdit } from 'react-icons/fa';
import { BiChat, BiCopy } from 'react-icons/bi';
import { FcCancel, FcProcess, FcOk } from 'react-icons/fc';
import { FaFileInvoice } from 'react-icons/fa';
import classnames from 'classnames';
import { FaUserFriends } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import { RiBankFill } from 'react-icons/ri';
import { IoPerson, IoNotifications } from 'react-icons/io5';
import { HiOutlineDocumentReport } from 'react-icons/hi';

export type TIconName =
  | 'BiDotsVertical'
  | 'BiTransfer'
  | 'BiCheckCircle'
  | 'FiInfo'
  | 'FiMinimize'
  | 'FiShoppingBag'
  | 'FiEdit'
  | 'BiMoney'
  | 'HiExclamation'
  | 'HiCheckCircle'
  | 'HiX'
  | 'MdDelete'
  | 'SiCashapp'
  | 'FaUserEdit'
  | 'BiChat'
  | 'BiCopy'
  | 'FcOk'
  | 'FcProcess'
  | 'FcCancel'
  | 'FiRotateCw'
  | 'BiCreditCard'
  | 'BiListPlus'
  | 'AiFillEye'
  | 'AiFillEyeInvisible'
  | 'MdArrowDropDown'
  | 'GiHamburgerMenu'
  | 'BsCheckLg'
  | 'BsCreditCardFill'
  | 'MdInsights'
  | 'BsFillFilePersonFill'
  | 'MdCancel'
  | 'FiUpload'
  | 'AiTwotoneHome'
  | 'FaFileInvoice'
  | 'FaUserFriends'
  | 'TiDocumentText'
  | 'RiBankFill'
  | 'SiSquare'
  | 'IoPerson'
  | 'BsTagFill'
  | 'HiOutlineDocumentReport'
  | 'BsFillArrowLeftSquareFill'
  | 'BsFillArrowRightSquareFill'
  | 'BsArrowClockwise'
  | 'AiOutlineArrowRight'
  | 'AiOutlineArrowLeft'
  | 'FiExternalLink'
  | 'IoNotifications'
  | 'BiLogIn';

export interface IIconProps {
  name: TIconName;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
  rr?: React.MutableRefObject<null>;
}

export const Icon: React.FunctionComponent<IIconProps> = props => {
  const iconSize = props.size || 25;
  const innerProps = {
    size: iconSize,
    color: props.color,
    onClick: props.onClick,
    className: classnames(props.className, {
      ['cursor-pointer rounded']: Boolean(props.onClick),
    }),
    ref: props.rr,
  };
  switch (props.name) {
    case 'BiCheckCircle':
      return <BiCheckCircle {...innerProps} />;
    case 'FiInfo':
      return <FiInfo {...innerProps} />;
    case 'FiRotateCw':
      return <FiRotateCw {...innerProps} />;
    case 'FiMinimize':
      return <FiMinimize {...innerProps} />;
    case 'FiShoppingBag':
      return <FiShoppingBag {...innerProps} />;
    case 'FiEdit':
      return <FiEdit {...innerProps} />;
    case 'BiMoney':
      return <BiMoney {...innerProps} />;
    case 'HiExclamation':
      return <HiExclamation {...innerProps} />;
    case 'HiCheckCircle':
      return <HiCheckCircle {...innerProps} />;
    case 'HiX':
      return <HiX {...innerProps} />;
    case 'MdDelete':
      return <MdDelete {...innerProps} />;
    case 'SiCashapp':
      return <SiCashapp {...innerProps} />;
    case 'FaUserEdit':
      return <FaUserEdit {...innerProps} />;
    case 'BiChat':
      return <BiChat {...innerProps} />;
    case 'BiCopy':
      return <BiCopy {...innerProps} />;
    case 'FcOk':
      return <FcOk {...innerProps} />;
    case 'FcProcess':
      return <FcProcess {...innerProps} />;
    case 'FcCancel':
      return <FcCancel {...innerProps} />;
    case 'BiCreditCard':
      return <BiCreditCard {...innerProps} />;
    case 'BiTransfer':
      return <BiTransfer {...innerProps} />;
    case 'BiDotsVertical':
      return <BiDotsVertical {...innerProps} />;
    case 'BiListPlus':
      return <BiListPlus {...innerProps} />;
    case 'AiFillEye':
      return <AiFillEye {...innerProps} />;
    case 'AiFillEyeInvisible':
      return <AiFillEyeInvisible {...innerProps} />;
    case 'MdArrowDropDown':
      return <MdArrowDropDown {...innerProps} />;
    case 'GiHamburgerMenu':
      return <GiHamburgerMenu {...innerProps} />;
    case 'BsCheckLg':
      return <BsCheckLg {...innerProps} />;
    case 'BsCreditCardFill':
      return <BsCreditCardFill {...innerProps} />;
    case 'MdInsights':
      return <MdInsights {...innerProps} />;
    case 'BsFillFilePersonFill':
      return <BsFillFilePersonFill {...innerProps} />;
    case 'MdCancel':
      return <MdCancel {...innerProps} />;
    case 'FiUpload':
      return <FiUpload {...innerProps} />;
    case 'AiTwotoneHome':
      return <AiTwotoneHome {...innerProps} />;
    case 'FaFileInvoice':
      return <FaFileInvoice {...innerProps} />;
    case 'FaUserFriends':
      return <FaUserFriends {...innerProps} />;
    case 'TiDocumentText':
      return <TiDocumentText {...innerProps} />;
    case 'RiBankFill':
      return <RiBankFill {...innerProps} />;
    case 'SiSquare':
      return <SiSquare {...innerProps} />;
    case 'IoPerson':
      return <IoPerson {...innerProps} />;
    case 'BsTagFill':
      return <BsTagFill {...innerProps} />;
    case 'HiOutlineDocumentReport':
      return <HiOutlineDocumentReport {...innerProps} />;
    case 'BsFillArrowLeftSquareFill':
      return <BsFillArrowLeftSquareFill {...innerProps} />;
    case 'BsFillArrowRightSquareFill':
      return <BsFillArrowRightSquareFill {...innerProps} />;
    case 'BsArrowClockwise':
      return <BsArrowClockwise {...innerProps} />;
    case 'AiOutlineArrowRight':
      return <AiOutlineArrowRight {...innerProps} />;
    case 'AiOutlineArrowLeft':
      return <AiOutlineArrowLeft {...innerProps} />;
    case 'FiExternalLink':
      return <FiExternalLink {...innerProps} />;
    case 'IoNotifications':
      return <IoNotifications {...innerProps} />;
    case 'BiLogIn':
      return <BiLogIn {...innerProps} />;
  }
  return <>{props.name}</>;
};
