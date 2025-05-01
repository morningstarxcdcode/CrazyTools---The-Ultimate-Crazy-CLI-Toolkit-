#!/bin/bash
_crazygrep_completions()
{
    COMPREPLY=($(compgen -W "--help --verbose --config" -- "${COMP_WORDS[COMP_CWORD]}"))
}
complete -F _crazygrep_completions crazygrep
