export {
    GetCurrentBreakpoint
}

import { BREAKPOINT_XSMALL, BREAKPOINT_SMALL_VALUE, BREAKPOINT_SMALL, BREAKPOINT_MEDIUM_VALUE, BREAKPOINT_MEDIUM, BREAKPOINT_LARGE_VALUE, BREAKPOINT_LARGE, BREAKPOINT_XLARGE_VALUE, BREAKPOINT_XLARGE, BREAKPOINT_XXLARGE_VALUE, BREAKPOINT_XXLARGE } from "/js/constant.js";

function GetCurrentBreakpoint() {
    if(window.width >= BREAKPOINT_XXLARGE_VALUE)
        return BREAKPOINT_XXLARGE;
    else if(window.width >= BREAKPOINT_XLARGE_VALUE)
        return BREAKPOINT_XLARGE;
    else if(window.width >= BREAKPOINT_LARGE_VALUE)
        return BREAKPOINT_LARGE;
    else if(window.width >= BREAKPOINT_MEDIUM_VALUE)
        return BREAKPOINT_MEDIUM;
    else if(window.width >= BREAKPOINT_SMALL_VALUE)
        return BREAKPOINT_SMALL;
    else
        return BREAKPOINT_XSMALL;
}