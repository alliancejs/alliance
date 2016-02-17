/**
 * Alliance : TypeScript framework for NodeJS (http://alliancejs.com)
 * Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 * @link          http://alliancejs.com Alliance Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

import * as colors from 'colors';

export class Log {
    public static message(...message) {
        if (allianceTaskOptions.debug) {
            console.log(`[${new Date().toLocaleString()}]`.gray, ...message);
        }
    }

    public static warning(...message) {
        this.message(message.join(' ').yellow);
    }

    public static error(...message) {
        this.message(message.join(' ').red);
    }

    public static success(...message) {
        this.message(message.join(' ').green);
    }

    public static event = {
        warning: 'warning',
        error: 'error',
        info: 'message',
        request: 'request'
    }
}
