import * as IconsMaterial from '@mui/icons-material';
import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IButtonProps extends SvgIconProps {
    icon: any;
    width?: number;
    height?: number;
}

export const icons = {
    DownloadDone: IconsMaterial.DownloadDone,
    NotInterested: IconsMaterial.NotInterested,
    CurrencyExchange: IconsMaterial.CurrencyExchange,
    Paid: IconsMaterial.Paid,
    PriceCheck: IconsMaterial.PriceCheck,
    EventNote: IconsMaterial.EventNote,
    Close: IconsMaterial.Close,
    RequestQuote: IconsMaterial.RequestQuote,
    Print: IconsMaterial.Print,
    InstallDesktop: IconsMaterial.InstallDesktop,
    ClearAll: IconsMaterial.ClearAll,
    ModeEdit: IconsMaterial.ModeEdit,
    Delete: IconsMaterial.Delete,
    Search: IconsMaterial.Search,
    AddCircle: IconsMaterial.AddCircle,
    Functions: IconsMaterial.Functions,
    SwipeRight: IconsMaterial.SwipeRight,
    PermIdentityOutlined: IconsMaterial.PermIdentityOutlined,
    LockOutlined: IconsMaterial.LockOutlined,
    BusinessCenter: IconsMaterial.BusinessCenter,
    MoneyOff: IconsMaterial.MoneyOff,
    MoneyOffCsred: IconsMaterial.MoneyOffCsred,
    Cable: IconsMaterial.Cable,
    PriceChange: IconsMaterial.PriceChange,
    PaidTwoTone: IconsMaterial.PaidTwoTone,
    Archive: IconsMaterial.Archive,
    Business: IconsMaterial.Business,
    Check: IconsMaterial.Check,
    AddCard: IconsMaterial.AddCard,
    AccountCircle: IconsMaterial.AccountCircle,
    AccountBox: IconsMaterial.AccountBox,
    EditRoad: IconsMaterial.EditRoad,
    MemoryOutlined: IconsMaterial.MemoryOutlined,
    Dashboard: IconsMaterial.Dashboard,
    Flag: IconsMaterial.Flag,
    StickyNote2: IconsMaterial.StickyNote2,
    GraphicEq: IconsMaterial.GraphicEq,
    AccountTree: IconsMaterial.AccountTree,
    ReportGmailerrorred: IconsMaterial.ReportGmailerrorred,
    Groups: IconsMaterial.Groups,
    Summarize: IconsMaterial.Summarize,
    PhonelinkRing: IconsMaterial.PhonelinkRing,
    PlaylistAddCheck: IconsMaterial.PlaylistAddCheck,
    FilterList: IconsMaterial.FilterList,
    StarBorder: IconsMaterial.StarBorder,
    Star: IconsMaterial.Star,
    FormatColorFill: IconsMaterial.FormatColorFill,
    EditOutlined: IconsMaterial.EditOutlined,
    ChevronLeft: IconsMaterial.ChevronLeft,
    ChevronRight: IconsMaterial.ChevronRight,
};

export const IconComponent = (properties: IButtonProps) => {
    return (
        <SvgIcon
            {...properties}
            component={properties.icon}
            disabled
            // sx={{ width: 24, height: 24 }}
        />
    );
};
