#!/bin/bash
_highlightcat_completions()
{
    COMPREPLY=($(compgen -W "--help --verbose --config" -- "${COMP_WORDS[COMP_CWORD]}"))
}
complete -F _highlightcat_completions highlightcat
