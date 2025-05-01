#!/bin/bash
_smartcd_completions()
{
    COMPREPLY=($(compgen -W "--help --verbose add" -- "${COMP_WORDS[COMP_CWORD]}"))
}
complete -F _smartcd_completions smartcd
