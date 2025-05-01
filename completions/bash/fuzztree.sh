#!/bin/bash
_fuzztree_completions()
{
    COMPREPLY=($(compgen -W "--help --verbose --config" -- "${COMP_WORDS[COMP_CWORD]}"))
}
complete -F _fuzztree_completions fuzztree
