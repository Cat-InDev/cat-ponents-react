import { useEffect } from 'react';
import { EffectHooksProps } from '@catindev/cat-ponents-react';
import { UseIndexStates } from './useStates';
import { UseIndexActions } from './useActions';

export const useModalEffects = (hookProps: EffectHooksProps<UseIndexActions, UseIndexStates, Record<string, any>>): void => {
    hookProps

    useEffect(() => {
        
    }, [])
}