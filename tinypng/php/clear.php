<?php
    function clear() 
    {
        if (file_exists('../imgOptimized/'))
        {
            foreach (glob('../imgOptimized/*') as $file)
            {
                @unlink($file);
            }
        }
    }

